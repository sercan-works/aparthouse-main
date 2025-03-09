import React from "react";
import {
  Autocomplete,
  AutocompleteItem
} from "@heroui/autocomplete";
import { Button } from "@heroui/react";
import FilterButton from "./filter-modal/FilterButton";

export const animals = [
  {
    label: "Cat",
    key: "cat",
    description: "The second most popular pet in the world"
  },
  {
    label: "Dog",
    key: "dog",
    description: "The most popular pet in the world"
  },
  {
    label: "Elephant",
    key: "elephant",
    description: "The largest land animal"
  },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals"
  },
  {
    label: "Penguin",
    key: "penguin",
    description: "A group of aquatic flightless birds"
  },
  {
    label: "Zebra",
    key: "zebra",
    description: "A several species of African equids"
  },
  {
    label: "Shark",
    key: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton"
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals"
  },
  {
    label: "Otter",
    key: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae"
  },
  {
    label: "Crocodile",
    key: "crocodile",
    description: "A large semiaquatic reptile"
  }
];
  
const FilterBar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-lg px-6">
      <Autocomplete className="w-[25vh]" radius="none" label="Şehir" size="sm">
        {animals.map((animal) => (
          <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
        ))}
      </Autocomplete>

      <Autocomplete
        className="w-[25vh]"
        radius="none"
        label="Üniversite"
        size="sm"
      >
        {animals.map((animal) => (
          <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
        ))}
      </Autocomplete>

      <Autocomplete
        className="w-[25vh]"
        radius="none"
        label="Apart Tipi"
        size="sm"
      >
        {animals.map((animal) => (
          <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
        ))}
      </Autocomplete>
      <div className="relative left-28 -top-6">
        <Button className="absolute bg-colorFirst right-4   text-white rounded-lg p-6">
          Bul
        </Button>
        <div className="absolute -right-20 top-1 ring-4 ring-colorFirst rounded-xl">
          <FilterButton />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
