"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";

export default function TestimonialsSection({ t }: any) {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) setReviews(JSON.parse(saved));
    else {
      const defaultReviews = [
        { name: "Sala", rating: 5, comment: t.defaultReview1 },
        { name: "Amine A", rating: 4, comment: t.defaultReview2 },
      ];
      setReviews(defaultReviews);
      localStorage.setItem("reviews", JSON.stringify(defaultReviews));
    }
  }, [t]);

  const addReview = (review: any) => {
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900">
          {t.testimonialsTitle}
        </h2>
        <p className="mt-4 text-black max-w-2xl mx-auto">
          {t.testimonialsDesc}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {reviews.slice(0, 3).map((review, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                {review.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg">{review.name}</h3>
            </div>

            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={
                    star <= review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="text-black italic">"{review.comment}"</p>
          </div>
        ))}
      </div>

      <div className="text-center mb-20">
        <Link
          href="/temoignages"
          className="inline-block bg-white px-8 py-3 rounded-full shadow hover:shadow-md transition font-medium"
        >
          {t.seeMore}
        </Link>
      </div>

      <ReviewForm onAddReview={addReview} t={t} />
    </>
  );
}

function ReviewForm({ onAddReview, t }: any) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !comment || rating === 0) return alert(t.fillAllFields);

    onAddReview({ name, comment, rating });
    setName("");
    setComment("");
    setRating(0);

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-14 max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-blue-900">
        {t.reviewButton}
      </h3>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700 text-center font-medium">
          ✅ {t.reviewSuccess}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200"
        />

        <div className="flex gap-3 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer ${
                (hover || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <textarea
          rows={5}
          placeholder={t.commentPlaceholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200"
        />

        <div className="text-center">
          <button
            type="submit"
            className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold"
          >
            {t.reviewButton}
          </button>
        </div>
      </form>
    </div>
  );
}







// "use client";

// import { useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";

// export default function TestimonialsSection({ t }: any) {
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [userId, setUserId] = useState<string>("");

//   // Créer ou récupérer un userId unique pour identifier le visiteur
//   useEffect(() => {
//     let uid = localStorage.getItem("userId");
//     if (!uid) {
//       uid = uuidv4();
//       localStorage.setItem("userId", uid);
//     }
//     setUserId(uid);
//   }, []);

//   // Charger les reviews approuvées depuis MongoDB Atlas
//   const loadReviews = async () => {
//     try {
//       const res = await fetch("/api/reviews/approved");
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const text = await res.text();
//       const data = text ? JSON.parse(text) : [];
//       setReviews(data);
//     } catch (err) {
//       console.error("Erreur lors du chargement des reviews :", err);
//       setReviews([]); // tableau vide si problème
//     }
//   };

//   useEffect(() => {
//     loadReviews();
//   }, []);

//   // Ajouter un nouveau commentaire (sera en "pending")
//   const addReview = async (review: any) => {
//     try {
//       await fetch("/api/reviews", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // ⚡ obligatoire
//         },
//         body: JSON.stringify({ ...review, userId }),
//       });
//       loadReviews();
//     } catch (err) {
//       console.error("Erreur lors de l'ajout d'une review :", err);
//     }
//   };

//   // Supprimer son commentaire
//   const deleteReview = async (id: string) => {
//     try {
//       await fetch("/api/reviews/delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       loadReviews();
//     } catch (err) {
//       console.error("Erreur lors de la suppression d'une review :", err);
//     }
//   };

//   // Modifier son commentaire
//   const editReview = async (id: string, newComment: string, newRating: number) => {
//     try {
//       await fetch("/api/reviews/approve", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, comment: newComment, rating: newRating }),
//       });
//       loadReviews();
//     } catch (err) {
//       console.error("Erreur lors de la modification d'une review :", err);
//     }
//   };

//   return (
//     <>
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-5xl font-bold text-blue-900">{t.testimonialsTitle}</h2>
//         <p className="mt-4 text-black max-w-2xl mx-auto">{t.testimonialsDesc}</p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 mb-10">
//         {reviews.map((review) => (
//           <ReviewCard
//             key={review._id}
//             review={review}
//             userId={userId}
//             onDelete={deleteReview}
//             onEdit={editReview}
//           />
//         ))}
//       </div>

//       <div className="text-center mb-20">
//         <a
//           href="/temoignages"
//           className="inline-block bg-white px-8 py-3 rounded-full shadow hover:shadow-md transition font-medium"
//         >
//           {t.seeMore}
//         </a>
//       </div>

//       <ReviewForm onAddReview={addReview} t={t} />
//     </>
//   );
// }

// // --- Composants ReviewCard et ReviewForm ---
// function ReviewCard({ review, userId, onDelete, onEdit }: any) {
//   const [editing, setEditing] = useState(false);
//   const [comment, setComment] = useState(review.comment);
//   const [rating, setRating] = useState(review.rating);

//   const canEdit = review.userId === userId;

//   const handleSave = () => {
//     onEdit(review._id, comment, rating);
//     setEditing(false);
//   };

//   return (
//     <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
//       <div className="flex items-center gap-4 mb-4">
//         <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
//           {review.name.charAt(0)}
//         </div>
//         <h3 className="font-semibold text-lg">{review.name}</h3>
//       </div>

//       <div className="flex mb-4">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             size={20}
//             className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//           />
//         ))}
//       </div>

//       {editing ? (
//         <div className="space-y-4">
//           <textarea
//             rows={4}
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="w-full border rounded-xl p-2"
//           />
//           <div className="flex gap-2">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={24}
//                 className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//                 onClick={() => setRating(star)}
//               />
//             ))}
//           </div>
//           <button
//             onClick={handleSave}
//             className="bg-blue-800 text-white px-4 py-2 rounded"
//           >
//             Sauvegarder
//           </button>
//         </div>
//       ) : (
//         <p className="text-black italic mb-2">"{review.comment}"</p>
//       )}

//       {canEdit && !editing && (
//         <div className="flex gap-2 mt-4">
//           <button
//             onClick={() => setEditing(true)}
//             className="bg-yellow-500 text-white px-4 py-2 rounded"
//           >
//             Modifier
//           </button>
//           <button
//             onClick={() => onDelete(review._id)}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Supprimer
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function ReviewForm({ onAddReview, t }: any) {
//   const [name, setName] = useState("");
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!name || !comment || rating === 0) return alert(t.fillAllFields);

//     await onAddReview({ name, comment, rating });
//     setName("");
//     setComment("");
//     setRating(0);
//     setSuccess(true);
//     setTimeout(() => setSuccess(false), 3000);
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-14 max-w-4xl mx-auto">
//       <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-blue-900">{t.reviewButton}</h3>

//       {success && (
//         <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700 text-center font-medium">
//           ✅ {t.reviewSuccess}
//         </div>
//       )}

//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder={t.namePlaceholder}
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-3 rounded-xl border border-gray-200"
//         />

//         <div className="flex gap-3 justify-center">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               size={32}
//               className={`cursor-pointer ${(hover || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//               onClick={() => setRating(star)}
//               onMouseEnter={() => setHover(star)}
//               onMouseLeave={() => setHover(0)}
//             />
//           ))}
//         </div>

//         <textarea
//           rows={5}
//           placeholder={t.commentPlaceholder}
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="w-full px-4 py-3 rounded-xl border border-gray-200"
//         />

//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold"
//           >
//             {t.reviewButton}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






