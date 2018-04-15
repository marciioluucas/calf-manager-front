/* eslint-disable no-return-await */
export default async (url) => {
  return await url.split(' ').join('-')
}
