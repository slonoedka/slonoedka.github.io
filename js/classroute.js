/**
 * ClassRoute class.
 * The idea is that all routes (URLs) must "have" unique CSS class: identifier.
 * In our case this CSS class will be generate automatically uses
 * `location.pathname`.
 * @param {object} config                                    Configuration of
 *                                                           the object.
 * @param {string} config.onEvent                            Event name on which
 *                                                           CSS class setter
 *                                                           will be executed.
 * @param {string} [config.replaceSpecCharsOn='-']           On what character
 *                                                           will be replaced
 *                                                           special characters
 *                                                           in the `pathname`.
 * @param {string} [config.classPrefix='cr']                 Custom CSS class
 *                                                           prefix. This is
 *                                                           abbreviation of
 *                                                           "ClassRoute".
 * @param {string} config.classPostfix                       Custom CSS class
 *                                                           postfix.
 * @param {string} [config.classTargetSelector='body > div'] CSS selector of a
 *                                                           element where the
 *                                                           generated CSS class
 *                                                           will be added.
 * @constructor
 */
function ClassRoute(config)
{
  this.onEvent = config.onEvent || 'DOMContentLoaded';
  this.replaceSpecCharsOn = config.replaceSpecCharsOn || '-';
  this.classPrefix = config.classPrefix || 'cr'; // "ClassRoute"
  this.classPostfix = config.classPostfix ? ('/' + config.classPostfix) : '';
  this.classTargetSelector = config.classTargetSelector || 'body > div';
  this.process();
}

/**
 * Main method.
 */
ClassRoute.prototype.process = function ()
{
  window.addEventListener(this.onEvent, classSetter.bind(this));

  function classSetter()
  {
    const pathname = this.classPrefix + location.pathname + this.classPostfix;
    const className =
      pathname.replace(/[^a-z0-9-_]/gi, this.replaceSpecCharsOn);
    const classTarget = document.querySelector(this.classTargetSelector);
    classTarget.classList.add(className);
  }
};
