import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GoToFlores() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-300 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-bold">GoToFlores</h1>
        <Button variant="outline" className="text-white border-white">Login</Button>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Cari destinasi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg shadow-md focus:outline-none"
        />
        <Search className="absolute right-3 top-3 text-gray-500" />
      </div>
      
      {/* Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations
          .filter((dest) =>
            dest.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((dest, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Card className="overflow-hidden shadow-lg">
                <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">{dest.name}</h2>
                    <div className="flex items-center">
                      <Star className="text-yellow-400" />
                      <span className="ml-1 text-sm">{dest.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{dest.description}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="text-red-500" />
                    <span className="ml-1 text-sm">{dest.location}</span>
                  </div>
                  <Button className="mt-3 w-full">Lihat Detail</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

const destinations = [
  {
    name: "Labuan Bajo",
    image: "https://source.unsplash.com/400x300/?beach",
    rating: "4.8",
    description: "Keindahan alam dengan pantai yang eksotis.",
    location: "Nusa Tenggara Timur",
  },
  {
    name: "Pulau Komodo",
    image: "https://source.unsplash.com/400x300/?island",
    rating: "4.9",
    description: "Habitat asli Komodo yang terkenal di dunia.",
    location: "Nusa Tenggara Timur",
  },
];
