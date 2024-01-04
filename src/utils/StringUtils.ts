const Strings = {
  /**
   * Method that checks if the given string is not defined or blank
   * @param str string to check
   * @returns true if defined and/or blank else false
   */
  isBlank(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
  },

  /**
   * Method that checks if the given string is defined and not blank
   * @param str string to check
   * @returns true if not blank else false
   */
  isNotBlank(str: string | null | undefined): str is string {
    return !Strings.isBlank(str);
  }
};

export default Strings;
