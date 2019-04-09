let OSS = require('ali-oss');
let client= new OSS({
  // accessKeyId: 'LTAIfpHVTCeQ5NyP',
  // accessKeySecret: 'WSFZ8mTpFiiDzSqwDKUoakQBdeSm1L',
  // bucket: 'happy-chat-test',
  // region: 'oss-cn-beijing'
  accessKeyId: 'LTAIwnJs9j5sRTIS',
  accessKeySecret: 'H4xvi5VrjcpHzKqvLTpn7BEg9qRkhK',
  bucket: 'miux',
  region: 'oss-cn-beijing'
});
// client.list().then((result) => {
//   console.log('objects: %j', result.objects);
//   return client.put('my-obj', new OSS.Buffer('hello world'));
// }).then((result) => {
//   console.log('put result: %j', result);
//   return client.get('my-obj');
// }).then((result) => {
//   console.log('get result: %j', result.content.toString());
// });
export default {
  client
}
