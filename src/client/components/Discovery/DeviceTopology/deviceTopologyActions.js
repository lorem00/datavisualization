import axios from 'axios';
import rest from '../../common/utils/restconfig';


const colors = ['#2A92A6', '#446F81', '#9A88A2', '#1AD7CA', '#17A59B', '#C99D6E', '#38484E'];

export function getDeviceTopologyData(data) {


  return dispatch => {
    let options = {
      headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_TOPOLOGY_DATA, data, options)
    .then(function (response) {

      if (response.data) {
        dispatch(setDeviceTopologyData(response.data));
        dispatch(setDeviceTopologyChartData(getDeviceTopologyChartData(response.data)));
        dispatch(setDeviceTopologyChartFilters(generateTopologyChartFilters(response.data)));

      }

    }).catch((error) => {
      if (error.response && error.response.data.type === 'error') {
        if (error.response.data.errorno === 1) {
          window.sessionStorage.removeItem('user');
          window.location = '/login';
        }
      }
      return callback(new Error('Could not get All Discovery Protocols'));
    });
  }

}

export function filterNodes(data) {

  return dispatch => {
    let options = {
      headers: Object.assign({'Content-Type': 'application/json'})
    };

    dispatch(setDeviceTopologyChartData(getFilteredData(data)));
  }

}

export function filterConnections(data) {


  return dispatch => {
    let options = {
      headers: Object.assign({'Content-Type': 'application/json'})
    };
    dispatch(setDeviceTopologyChartData(getFilteredData(data)));


  }

}

function idIndex(a, id) {
  for (var i = 0; i < a.length; i++) {
    if (a[i].id == id) {
      //  a[]
      return i;
    }
  }
  return null;
}

function getFilteredData(data) {
  var nodes = [], links = [], clusterIndex =0,clusters={};

  data.nodes.forEach(function (n, i) {
    if(clusters[n.cluster]===undefined){
      clusters[n.cluster]=clusterIndex;
      clusterIndex++;
    }


    if (idIndex(nodes, n.id) == null)
    nodes.push({id: n.id, cluster: clusters[n.cluster],clusterName:n.cluster,properties:n.properties, filter: n.filter, index: i, links: 0});
  });
  data.links.forEach(function (r) {

    let source = idIndex(nodes, r.source), target = idIndex(nodes, r.target);

    if (source !== null && target !== null){
      //  if(nodes[source] && nodes[source].links )
      nodes[source].links++;
      if(nodes[source] ){
        nodes[target].links++;
      }
    }
  });
  
  nodes = nodes.filter(node => (node.links && node.links > 0));
  console.log("nodes *", nodes);
  console.log("links", links);
  links = links.concat(data.links.map(function (r) {


    let source = idIndex(nodes, r.source), target = idIndex(nodes, r.target);

    if (source !== null && target !== null) {
      nodes[source].links++;
      nodes[target].links++;
      return {source, target, filter: r.filter};
    } else {
      return {source: 0, target: 0};
    }

  }));


  var viz = {nodes: nodes, links: links};
  console.log("filtered viz", viz);
  return viz;
}

function getDeviceTopologyChartData(data) {

  var nodes = [], links = [],clusterIndex =0,clusters={};

  data.nodes.forEach(function (n, i) {
    if(clusters[n.cluster]===undefined){
      clusters[n.cluster]=clusterIndex;
      clusterIndex++;
    }
    if (idIndex(nodes, n.id) == null)
    nodes.push({id: n.id, cluster: clusters[n.cluster],clusterName:n.cluster, filter: n.filter,properties:n.properties, index: i, links: 0});
  });
  console.log("clusters", clusters);

  links = links.concat(data.links.map(function (r) {

    let source = idIndex(nodes, r.source), target = idIndex(nodes, r.target);

    if (source !== null && target !== null) {
      nodes[source].links++;
      nodes[target].links++;
      return {source, target, filter: r.filter};
    } else {
      return {source: 0, target: 0, filter: {}};
    }

  }));

  console.log("nodes-", nodes);
  var viz = {nodes: nodes, links: links};
  console.log("viz", viz);
  return viz;

}


function makeFilters(data) {
  let filters = {};
  data.forEach(function (d, i) {
    for (let key in d.filter) {
      if (filters[key]) {
        if (Array.isArray(d.filter[key])) {
          addMultipleProperties(d.filter[key], key)
        } else {
          if (!filters[key].includes(d.filter[key]))
          filters[key].push(d.filter[key])
        }

      } else {
        if (Array.isArray(d.filter[key])) {
          addMultipleProperties(d.filter[key], key)
        } else {
          filters[key] = [d.filter[key]];
        }
      }
    }

  });

  function addMultipleProperties(arr, key) {
    arr.forEach(function (n) {
      if (filters[key]) {
        if (!filters[key].includes(n))
        filters[key].push(n);
      } else {
        filters[key] = [n];
      }

    });
  }

  return filters
}

function generateTopologyChartFilters(data) {

  let filters = {nodeFilters: makeFilters(data.nodes), connectionFilters: makeFilters(data.links)};
  console.log("filters", filters);
  return filters;
}

/*function getConnections(treeObj, idAttr, parentAttr, childrenAttr, levelAttr) {

if (!idAttr) idAttr = 'name';
if (!parentAttr) parentAttr = 'source';
if (!childrenAttr) childrenAttr = 'children';
if (!levelAttr) levelAttr = 'level';
var result={},levels=1;
var nodes=[];
var root =treeObj.name
nodes.push({id:root,name:root,level:1,color:"#000"});
function flattenChild(childObj, parentId, level) {
var array = [];
// console.log("parentId",parentId,"level", level);
if(level>levels)levels=level;
nodes.push({id:childObj.name,name:childObj.name,level:level,"color":"#000"});
var childCopy = Object.assign({}, childObj,{"target":childObj.name,"color":"#000"});
childCopy[levelAttr] = level;
childCopy[parentAttr] = parentId;
delete childCopy[childrenAttr];
array.push(childCopy);

array = array.concat(processChildren(childObj, level));

return array;
};

function processChildren(obj, level) {
if (!level) level = 1;
var array = [];

obj[childrenAttr].forEach(function(childObj) {
array = array.concat(flattenChild(childObj, obj[idAttr], level+1));
});

return array;
};

var links = processChildren(treeObj);
//console.log(treeObj.connections);
for(var i=0;i<treeObj.connections.length;i++){
links.push({source:root,target:treeObj.connections[i],level:1,"color":"#000"})
//console.log(i)
// console.log(links)
}
result.links=links;
result.nodes=nodes;
result.levels=levels;
return result;
};*/


function setDeviceTopologyChartData(data) {
  return {
    type: "GET_DEVICE_TOPOLOGY_CHART_DATA",
    data
  };
}

function setDeviceTopologyData(data) {
  console.log(data);
  return {
    type: "GET_DEVICE_TOPOLOGY_DATA",
    data
  };
}

function setDeviceTopologyChartFilters(data) {
  return {
    type: "GET_DEVICE_TOPOLOGY_CHART_FILTERS",
    data
  };
}

function showError(error) {
  return {
    type: "SHOW_ERROR",
    error
  };
}
