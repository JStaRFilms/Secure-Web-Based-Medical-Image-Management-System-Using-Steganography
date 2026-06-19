declare module 'daikon' {
  export namespace Series {
    function parseImage(dataView: DataView): {
      getRawData(): ArrayLike<number>;
      getCols(): number;
      getRows(): number;
    } | null;
  }
}
