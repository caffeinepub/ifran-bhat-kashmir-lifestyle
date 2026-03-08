import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type BlogPost = {
    id : Nat;
    title : Text;
    category : Text;
    excerpt : Text;
    content : Text;
    date : Text;
    imageUrl : Text;
    isVlog : Bool;
    tags : [Text];
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module BlogPost {
    public func compare(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Nat.compare(post1.id, post2.id);
    };
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Nat.compare(message1.id, message2.id);
    };
  };

  // Storage
  let blogPosts = Map.empty<Nat, BlogPost>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextPostId = 1;
  var nextMessageId = 1;

  // Pre-seeded blog posts
  public shared ({ caller }) func initializePosts() : async () {
    if (blogPosts.size() > 0) { Runtime.trap("Posts already initialized. This function should only be called once.") };

    let initialPosts = [
      {
        id = nextPostId;
        title = "A Glimpse into Kashmiri Cuisine";
        category = "Culture";
        excerpt = "Explore the rich flavors and unique dishes that define Kashmiri culinary traditions.";
        content = "Kashmiri cuisine is a culinary journey through a land of spices, rich flavors, and vibrant colors. From the aromatic Rogan Josh to the savory Dum Aloo, each dish tells a story of the region's history and cultural diversity. The Wazwan, a traditional multi-course feast, is a testament to the fine artistry and hospitality of Kashmiri hosts...";
        date = "2023-11-15";
        imageUrl = "https://example.com/kashmiri-cuisine.jpg";
        isVlog = false;
        tags = ["Kashmir", "Food", "Culture"];
      },
      {
        id = nextPostId + 1;
        title = "Mindful Living in the City";
        category = "Lifestyle";
        excerpt = "Tips and strategies for creating a balanced lifestyle in the hustle and bustle of urban life.";
        content = "Urban living often presents unique challenges to maintaining a mindful and balanced lifestyle. It's essential to carve out time for personal wellness, whether through regular exercise, meditation, or simply turning off digital devices for a few hours each day. Creating a routine that prioritizes self-care can have profound impacts on mental and physical health...";
        date = "2024-02-01";
        imageUrl = "https://example.com/city-lifestyle.jpg";
        isVlog = false;
        tags = ["Lifestyle", "Wellness", "Mindfulness"];
      },
      {
        id = nextPostId + 2;
        title = "Travel Diary: A Solo Journey Through Gulmarg";
        category = "Travel";
        excerpt = "Discover the breathtaking landscapes and adventures awaiting solo travelers in Gulmarg.";
        content = "Gulmarg, often referred to as the 'Meadow of Flowers', is a paradise for solo travelers seeking both tranquility and adventure. From the snow-capped peaks to the vibrant wildflowers, every corner offers a new experience. My journey included trekking, exploring local cuisine, and connecting with fellow adventurers from around the world...";
        date = "2024-03-12";
        imageUrl = "https://example.com/gulmarg-travel.jpg";
        isVlog = false;
        tags = ["Travel", "Adventure", "Kashmir"];
      },
      {
        id = nextPostId + 3;
        title = "My First Vlog: Yoga Morning Routine";
        category = "Vlog";
        excerpt = "Join me in my daily morning yoga routine and learn tips for starting your day with energy and focus.";
        content = "Starting the day with yoga has become a ritual that grounds me and sets a positive tone for the hours ahead. In my first vlog, I'll guide you through a series of poses perfect for beginners and share insights on building a sustainable morning routine. From breathing techniques to simple stretches, everyone can incorporate yoga into their daily life...";
        date = "2024-04-05";
        imageUrl = "https://example.com/yoga-morning.jpg";
        isVlog = true;
        tags = ["Vlog", "Yoga", "Lifestyle"];
      },
    ];

    for (post in initialPosts.values()) {
      blogPosts.add(post.id, post);
      nextPostId += 1;
    };
  };

  // Read-Only Queries
  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort();
  };

  public query ({ caller }) func getBlogPost(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  // Public Write Functions
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async Nat {
    let id = nextMessageId;
    let newMessage : ContactMessage = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(id, newMessage);
    nextMessageId += 1;
    id;
  };

  // Admin Functions
  public query ({ caller }) func getAllContactMessages(password : Text) : async [ContactMessage] {
    if (password != "adminPassword") { Runtime.trap("Unauthorized access") };
    contactMessages.values().toArray().sort();
  };

  // Attempted Public Write Function (should be admin only)
  // public shared ({ caller }) func addBlogPost(title : Text, category : Text, excerpt : Text, content : Text, date : Text, imageUrl : Text, isVlog : Bool, tags : [Text], password : Text) : async Nat {
  //   if (password != "adminPassword") { Runtime.trap("Unauthorized access") };
  //   let id = nextPostId;
  //   let newPost : BlogPost = {
  //     id;
  //     title;
  //     category;
  //     excerpt;
  //     content;
  //     date;
  //     imageUrl;
  //     isVlog;
  //     tags;
  //   };
  //   blogPosts.add(id, newPost);
  //   nextPostId += 1;
  //   id;
  // };
};
