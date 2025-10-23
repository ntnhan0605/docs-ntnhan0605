const reacts = [
  'react',
  'react/hooks/use-state',
  'react/extends/virtualized-list',
  'react/extends/virtualized-list-1',
];

/**
 * react
 *
 * Required: ['react', 'react/hooks/use-state', 'react/extends/virtualized-list', 'react/extends/virtualized-list-1']
 *
 *
 * ["react", ["react", "hooks", "use-state"], ["react", "extends", "virtualized-list"], ["react", "extends", "virtualized-list-1"]]
 *
 * { react },
 * { react : { hook : { "use-state" : {} } } },
 * { react : { extends : { "virtualized-list" : {} } } },
 * { react : { extends : { "virtualized-list-1" : {} } } },
 *
 * Expectation : {
 * "react" : {
 * 	"hooks" : {
 * 		"use-state" : {}
 * 	},
 * 	"extends" : {
 * 		"virtualized-list" : {}
 * 		"virtualized-list-1" : {}
 * 	}
 * }
 *
 *
 *
 */

const reactArray = [];
for (const react of reacts) {
  reactArray.push(react.split('/'));
}

function ArrayToObject(arr) {
  if (!arr.length) {
    return {};
  }
  return { [arr[0]]: ArrayToObject(arr.slice(1)) };
}

function deepMerge(target, source) {
  for (const key in source) {
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof target?.[key] === 'object' &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
      target[key] = target[key].concat(source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const reactObject = {};
for (const reactArr of reactArray) {
  const reactObj = ArrayToObject(reactArr);
  deepMerge(reactObject, reactObj);
}

console.log('** RYAN array_hasing.js 53 reactObject : ', reactObject);
