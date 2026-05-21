export const consolePrinter = {
  errorCSSstyling: "color: red; font-size: 10px; font-weight: bold",
  devlogCSSstyling: "color: white; font-size: 10px;",

  printError: function (errorData, serializeCb) {
    if (serializeCb) {
      console.error(
        `%c[ERROR_LOG]:${serializeCb(errorData)}`,
        this.errorCSSstyling,
      );
      return;
    }

    console.error(`%c[ERROR_LOG]:${errorData}`, this.errorCSSstyling);
  },

  printDevLog: function (logData, serializeCb) {
    if (serializeCb) {
      console.log(
        `%c[DEV_LOG]:${serializeCb(errorData)}`,
        this.devlogCSSstyling,
      );
      return;
    }

    console.log(`%c[DEV_LOG]:${logData}`, this.devlogCSSstyling);
  },
};
