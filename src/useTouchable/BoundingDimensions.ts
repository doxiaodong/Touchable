import PooledClass from './PooledClass'

const twoArgumentPooler = PooledClass.twoArgumentPooler

/**
 * PooledClass representing the bounding rectangle of a region.
 */
function BoundingDimensions(width: number, height: number) {
  this.width = width
  this.height = height
}

BoundingDimensions.prototype.destructor = function() {
  this.width = null
  this.height = null
}

BoundingDimensions.getPooledFromElement = function(element) {
  // @ts-ignore
  return BoundingDimensions.getPooled(element.offsetWidth, element.offsetHeight)
}

PooledClass.addPoolingTo(BoundingDimensions, twoArgumentPooler)

export default BoundingDimensions as any
