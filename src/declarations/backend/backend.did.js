export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'body' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'createPost' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getPost' : IDL.Func([IDL.Nat], [IDL.Opt(Post)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
