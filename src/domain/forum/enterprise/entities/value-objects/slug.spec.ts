import { test, expect, describe } from 'vitest'
import { Slug } from './slug'

describe('Slug', () => {
  test('it should be able create a new slug from text', async () => {
    const slug = Slug.createFromText('Example question title')
    expect(slug.value).toEqual('example-question-title')
  })
})
