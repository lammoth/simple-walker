'use strict';

import path from 'path';
import walk from 'walk';


/**
 * Returns a coincidences array.
 * @function
 * @param {string} location - The abosulte path to inspect.
 * @param {string} dirFilter - The dirname to inspect.
 * @param {string} fileFilter - The filename to inspect.
 * @returns {Array} An array with the search's coincidences.
 */
export default function(location, dirFilter, fileFilter) {

  /** An array to store coincidences. */
  const data = [];

  /**
   * @namespace
   * @property {object} listeners - An object composed by listeners ready to find coincidences.
   * @property {function} listeners.directories - A Function to operate over directories when a coincidence is found.
   * @property {function} listeners.file - A Function to operate over files when a coincidence is found.
   * @property {function} listeners.errors - A Function to catch errors.
   */
  
  const options = {
    listeners: {
      directories: function (root, dirStatsArray, next) {
        dirStatsArray.forEach((element, index, array) => {
          if (element.name === dirFilter) {
            data.push({
              dir: `${root}/${element.name}`,
              path: null
            });
          }
        });

        next();
      },
      file: function (root, fileStats, next) {
        data.forEach((element, index, array) => {
          element.path = !element.path ? (() => {
            if ((root === element.dir) && (fileStats.name === fileFilter)) {
              return path.join(root, '/', fileStats.name);
            } else if (!element.path) {
              return null;
            }
          })() : element.path;
        });

        next();
      },
      errors: function (root, nodeStatsArray, next) {
        next();
      }
    }
  };

  /** 
   * IMPORTANT: THIS METHOD IS SYNCHRONOUS
   * Search coincidences using the options defined.
   */
  const walker = walk.walkSync(location, options);

  return data;
}
