import Bool "mo:base/Bool";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Option "mo:base/Option";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    category: Text;
    timestamp: Int;
  };

  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  public query func getPosts() : async [Post] {
    Array.reverse(posts)
  };

  public func createPost(title: Text, body: Text, author: Text, category: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      body = body;
      author = author;
      category = category;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    nextId - 1
  };

  public query func getPost(id: Nat) : async ?Post {
    Array.find(posts, func (p: Post) : Bool { p.id == id })
  };
}
