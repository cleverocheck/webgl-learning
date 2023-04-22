import axios, { AxiosResponse } from 'axios'
import { glShaderTypes, glShaderTypesType } from 'data/webgl'

export function appendGl(target: HTMLElement): WebGL2RenderingContext {
  const canvas = document.createElement('canvas')
  target.appendChild(canvas)

  const gl = canvas.getContext('webgl2')
  if (!gl) throw new Error("Your browser doesn't support WebGL 2!")

  return gl
}

export async function loadShaderSourceBundle(path: string) {
  return (
    await Promise.all<AxiosResponse<string>>(
      Object.values(glShaderTypes).map((glShaderType) =>
        axios.get(`${path}/${glShaderType}.glsl`)
      )
    )
  ).reduce(
    (acc, response, i) => ({
      ...acc,
      [glShaderTypes[i]]: response.data
    }),
    {} as IShaderSourceBundle
  )
}

export function compileShaderBundle(
  gl: WebGL2RenderingContext,
  shaderSourceBundle: IShaderSourceBundle
) {
  const shaders: WebGLShader[] = []

  try {
    return Object.entries(shaderSourceBundle).reduce(
      (acc, [glShaderType, shaderSource]) => {
        const shader = gl.createShader(gl[glShaderType])
        if (!shader)
          throw new Error(
            `Something went wrong during ${glShaderType} creation!`
          )
        shaders.push(shader)

        gl.shaderSource(shader, shaderSource)
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
          throw new Error(
            `Something went wrong during ${glShaderType} compilation:\n${gl.getShaderInfoLog(
              shader
            )}`
          )

        return {
          ...acc,
          [glShaderType]: shader
        }
      },
      {} as IShaderBundle
    )
  } catch (e) {
    shaders.forEach((shader) => gl.deleteShader(shader))

    throw e
  }
}

export function createProgram(
  gl: WebGL2RenderingContext,
  shaderBundle: IShaderBundle
) {
  const program = gl.createProgram()

  try {
    if (!program)
      throw new Error('Something went wrong during a program creation!')

    Object.values(shaderBundle).forEach((shader) => {
      gl.attachShader(program, shader)
    })
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        `Something went wrong during a program linking:\n${gl.getProgramInfoLog(
          program
        )}`
      )
    }

    return program
  } catch (e) {
    Object.values(shaderBundle).forEach((shader) => gl.deleteShader(shader))
    gl.deleteProgram(program)

    throw e
  }
}

type IShaderSourceBundle = Record<glShaderTypesType, string>
type IShaderBundle = Record<glShaderTypesType, WebGLShader>
