import {
  appendGl,
  compileShaderBundle,
  createProgram,
  loadShaderSourceBundle
} from 'utils/webgl'

import { startLessonFunctionType } from '.'

export const startLesson: startLessonFunctionType = async () => {
  const gl = appendGl(document.body)
  const program = createProgram(
    gl,
    compileShaderBundle(gl, await loadShaderSourceBundle('lessons/1/shaders'))
  )

  const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition')
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  //three 2d points for 2D plane drawing
  const positions = [0, 0, 0, 0.5, 0.7, 0]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)
  //2 components per iteration - the data is 32bit floats - don't normalize the data -
  //0 = move forward size * sizeof(type) each iteration to get the next position - start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.useProgram(program)
  gl.bindVertexArray(vao)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}
