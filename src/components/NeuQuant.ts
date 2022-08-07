class NeuQuant {
    public network: any // int[netsize][4]
    public netindex: any // for network lookup - really 256

    // bias and freq arrays for learning
    public bias: any
    public freq: any
    public radpower: any
    public pixels: any
    public samplefac: any
    /*
        Constructor: NeuQuant

        Arguments:

        pixels - array of pixels in RGB format
        samplefac - sampling factor 1 to 30 where lower is better quality

        >
        > pixels = [r, g, b, r, g, b, r, g, b, ..]
        >
    */
    constructor(pixels: any, samplefac: any) {
        this.pixels = pixels
        this.samplefac = samplefac
    }
}

export default NeuQuant
