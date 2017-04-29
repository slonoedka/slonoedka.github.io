/**
 * Add specified class values. If these classes already exist in attribute of
 * the element, then they are ignored.
 */
Element.prototype.addClass = function (...className) {
  const args = Array.prototype.slice.call(arguments);
  return this.classList.add.apply(this.classList, args);
};

/**
 * Remove specified class values.
 */
Element.prototype.removeClass = function (...className) {
  const args = Array.prototype.slice.call(arguments);
  return this.classList.remove.apply(this.classList, args);
};

/**
 * When only one argument is present: Toggle class value; i.e., if class exists
 * then remove it and return `false`, if not, then add it and return `true`.
 * When a second argument is present: If the second argument evaluates to
 * `true`, add specified class value, and if it evaluates to `false`, remove it.
 */
Element.prototype.toggleClass = function (className, force) {
  const args = Array.prototype.slice.call(arguments);
  return this.classList.toggle.apply(this.classList, args);
};

/**
 * Checks if specified class value exists in class attribute of the element.
 */
Element.prototype.hasClass = function (className) {
  return this.classList.contains(className);
};
