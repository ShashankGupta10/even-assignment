import React from "react";

type CardProps = {
  id: number;
  name: string;
  status: string;
  image: string;
};

const Card = ({ name, status, image, id }: CardProps) => {
  return (
    <div key={id} className="min-w-64">
      <img src={image} />
      <div>{name}</div>
      <div>{status}</div>
    </div>
  );
};

export default Card;
