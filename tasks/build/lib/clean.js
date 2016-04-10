import del from 'del';

export default () => {
  del.sync(['lib', 'dist']);
};
