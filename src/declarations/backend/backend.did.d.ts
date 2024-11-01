import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'title' : string,
  'body' : string,
  'author' : string,
  'timestamp' : bigint,
  'category' : string,
}
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string, string, string], bigint>,
  'getPost' : ActorMethod<[bigint], [] | [Post]>,
  'getPosts' : ActorMethod<[], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
