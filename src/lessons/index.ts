import { startLesson as startLesson1 } from './1'

export const lessonNumberToStartFunction: Record<
  string,
  startLessonFunctionType
> = {
  '1': startLesson1
} as const

export type startLessonFunctionType = () => Promise<void>
