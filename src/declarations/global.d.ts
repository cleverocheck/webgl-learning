export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LESSON_NUMBER: string
    }
  }
}
