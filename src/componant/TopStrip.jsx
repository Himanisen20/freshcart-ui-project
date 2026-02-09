
import React from "react";
import "../css/Tostrip.css"

export default function TopStrip() {
  return (
    <div className="strip">
      <div className=" to-strip">
        <span>Super Value Deals - Save more with coupons</span>
        <div className="flex items-center gap-4">
          <button className="to-stripbtn flex items-center gap-1">
            <span role="img" aria-label="flag">
              🇬🇧
            </span>
            <span>English</span>
          </button>
        </div>
      </div>
    </div>
  );
}
