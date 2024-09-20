import React, { useEffect, useState } from "react";

function CastCard({ index, item, handleCastList }) {

  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    handleCastList({ name, profile }, index);
  }, [name, profile]);

  return (
    <div className="flex gap-[1rem] flex-col border-y py-[20px] border-[#353333]">
      <div className="flex gap-[10px] items-center">
        <label htmlFor="movietitle" className="font-[500] w-[100px]">
          Cast name
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter cast name"
          id="movietitle"
          className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
        />
      </div>
      <div className="flex gap-[10px] items-center">
        <label htmlFor="movietitle" className="font-[500] w-[100px]">
          Photo
        </label>
        <input
          onChange={(e) => setProfile(e.target.value)}
          value={profile}
          type="text"
          placeholder="Paste caste photo url"
          id="movietitle"
          className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
        />
      </div>
    </div>
  );
}

export default CastCard;
