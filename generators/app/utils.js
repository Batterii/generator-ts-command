// Regex pattern for valid command names.
const namePattern = /^[a-z0-9-]+$/;

/**
 * Validates a command name.
 * @param {string} name - Command name to validate.
 * @returns {boolean|string} - `true` if the name is valid, an error message
 *   otherwise.
 */
exports.validateName = function(name) {
	return namePattern.test(name) ||
		'Command name must be dash-separated lower case';
};
