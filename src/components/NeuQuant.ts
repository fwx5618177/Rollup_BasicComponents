/* NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994.
 * See "Kohonen neural networks for optimal colour quantization"
 * in "Network: Computation in Neural Systems" Vol. 5 (1994) pp 351-367.
 * for a discussion of the algorithm.
 * See also  http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal
 * in this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons who receive
 * copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * (JavaScript port 2012 by Johan Nordberg)
 */

import { alpharadbias, initalpha, intbias, netbiasshift, netsize } from './nums'

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

    toInt(v: number) {
        return ~~v
    }

    /*
      Private Method: init
      sets up arrays
    */
    init() {
        this.network = []
        this.netindex = []
        this.bias = []
        this.freq = []
        this.radpower = []

        let v
        for (let i = 0; i < netsize; i++) {
            v = (i << (netbiasshift + 8)) / netsize

            this.network[i] = [v, v, v]
            this.freq[i] = intbias / netsize

            this.bias[i] = 0
        }
    }

    /*
    Private Method: unbiasnet

    unbiases network to give byte values 0..255 and record position i to prepare for sort
  */
    unbiasnet() {
        for (let i = 0; i < netsize; i++) {
            this.network[i][0] >>= netbiasshift
            this.network[i][1] >>= netbiasshift
            this.network[i][2] >>= netbiasshift
            this.network[i][3] = i // record color number
        }
    }

    /*
    Private Method: altersingle

    moves neuron *i* towards biased (b,g,r) by factor *alpha*
  */
    altersingle(alpha: number, i: number, b: number, g: number, r: number) {
        this.network[i][0] -= (alpha * (this.network[i][0] - b)) / initalpha
        this.network[i][1] -= (alpha * (this.network[i][1] - g)) / initalpha
        this.network[i][2] -= (alpha * (this.network[i][2] - r)) / initalpha
    }

    /*
    Private Method: alterneigh

    moves neurons in *radius* around index *i* towards biased (b,g,r) by factor *alpha*
  */
    alterneigh(radius: number, i: number, b: number, g: number, r: number) {
        const lo = Math.abs(i - radius)
        const hi = Math.min(i + radius, netsize)

        let j = i + 1
        let k = i - 1
        let m = 1

        let p, a
        while (j < hi || k > lo) {
            a = this.radpower[m++]

            if (j < hi) {
                p = this.network[j++]
                p[0] -= (a * (p[0] - b)) / alpharadbias
                p[1] -= (a * (p[1] - g)) / alpharadbias
                p[2] -= (a * (p[2] - r)) / alpharadbias
            }

            if (k > lo) {
                p = this.network[k--]
                p[0] -= (a * (p[0] - b)) / alpharadbias
                p[1] -= (a * (p[1] - g)) / alpharadbias
                p[2] -= (a * (p[2] - r)) / alpharadbias
            }
        }
    }
}

export default NeuQuant
