import del from 'del';

export default () => {
  del.sync(['example/dist']);
};
