import { MongoClient, ObjectId } from "mongodb";

const db_link =
  "mongodb+srv://polidahiya830:12er56ui90%40Poli@cluster0.pvrgiqn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(db_link);

client.connect();
const db = client.db("ctearapp");
const data = db.collection("data");

// (async () => {
//   for (let i = 0; i < 100; i++) {
//     await data.insertOne({
//       id: i + "" + Math.random() * 100,
//       images: [
//         "https://cdn4.sharechat.com/img_485623_1505289c_1668749482504_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=504_sc.jpg",
//         "https://cdn4.sharechat.com/img_485623_1505289c_1668749482504_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=504_sc.jpg",
//         "https://cdn4.sharechat.com/img_485623_1505289c_1668749482504_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=504_sc.jpg",
//       ],
//       tags: "hello ",
//     });
//   }
// })();

export { data, ObjectId };
