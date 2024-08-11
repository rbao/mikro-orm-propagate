import { expect, test } from 'vitest';
import { initORM } from '../src/db.js';
import { User } from '../src/modules/user/user.entity.js';
import { Article } from '../src/modules/article/article.entity.js';
import { ref } from '@mikro-orm/core';

test('propagate', async () => {
  const db = await initORM();
  db.orm.config.set('allowGlobalContext', true);
  db.orm.em.clear();

  const user = db.em.create(User, { fullName: 'test', email: 'test', password: 'test'});
  const article = db.em.create(Article, { author: ref(user), title: 'test', description: 'test', text: 'test' })

  expect(article.author.unwrap()).toBe(user);
  expect(user.articles.length).toBe(1);
})