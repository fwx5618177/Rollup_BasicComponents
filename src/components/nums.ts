export const ncycles = 100 // number of learning cycles
export const netsize = 256 // number of colors used
export const maxnetpos = netsize - 1

// defs for freq and bias
export const netbiasshift = 4 // bias for colour values
export const intbiasshift = 16 // bias for fractions
export const intbias = 1 << intbiasshift

// defs for decreasing alpha factor
export const alphabiasshift = 10 // alpha starts at 1.0
export const initalpha = 1 << alphabiasshift

/* radbias and alpharadbias used for radpower calculation */
export const radbiasshift = 8
export const radbias = 1 << radbiasshift
export const alpharadbshift = alphabiasshift + radbiasshift
export const alpharadbias = 1 << alpharadbshift

// four primes near 500 - assume no image has a length so large that it is
// divisible by all four primes
export const prime1 = 499
export const prime2 = 491
export const prime3 = 487
export const prime4 = 503
export const minpicturebytes = 3 * prime4
