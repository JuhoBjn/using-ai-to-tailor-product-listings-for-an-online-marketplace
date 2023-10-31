import { useRef } from "react";

import "./Profile.css";

const Profile = () => {
  const ageRef = useRef(1);
  const sexRef = useRef("dont-specify");
  const heightRef = useRef(1);
  const weightRef = useRef(1);
  const mobilePlatformRef = useRef("ios");

  const submitUserProfile = (event) => {
    event.preventDefault();

    console.log("Submit user profile");
  };

  return (
    <div className="background">
      <div className="user-profile-form_container">
        <h1 id="user-profile-form_title">Create a user profile</h1>
        <form onSubmit={submitUserProfile}>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" min="1" ref={ageRef} required />
          <label htmlFor="sex">Sex</label>
          <select id="sex" ref={sexRef} required>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
            <option value="dont-specify">I&apos;t rather not specify</option>
          </select>
          <label htmlFor="height">Height (cm)</label>
          <input id="height" type="number" min="1" ref={heightRef} required />
          <label htmlFor="weight">Weight (kg)</label>
          <input id="weight" type="number" min="1" ref={weightRef} required />
          <div className="mobile-platform-input">
            <p>Mobile platform</p>
            <input
              id="mobile-android"
              type="radio"
              name="mobile-platform"
              value="android"
              ref={mobilePlatformRef}
            />
            <label htmlFor="mobile-android">Android</label>
            <input
              id="mobile-ios"
              type="radio"
              name="mobile-platform"
              value="ios"
              ref={mobilePlatformRef}
            />
            <label htmlFor="mobile-ios">iOS</label>
          </div>
          <label htmlFor="activity-level">Activity level</label>
          <input id="activity-level" type="text" />
          <button>Personalize products</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
