import PooledClass from './PooledClass'

const twoArgumentPooler = PooledClass.twoArgumentPooler

function Position(left, top) {
  this.left = left
  this.top = top
}

Position.prototype.destructor = function() {
  this.left = null
  this.top = null
}

PooledClass.addPoolingTo(Position, twoArgumentPooler)

export default Position as any
