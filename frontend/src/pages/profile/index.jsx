import { useRef } from "react";

import "./Profile.css";

const Profile = () => {
  const ageRef = useRef(1);
  const sexRef = useRef("dont-specify");
  const heightRef = useRef(1);
  const weightRef = useRef(1);
  const iosPlatformRef = useRef(null);
  const androidPlatformRef = useRef(null);
  const activityLevelRef = useRef("average");

  const submitUserProfile = (e) => {
    e.preventDefault();

    let mobilePlatform;
    if (androidPlatformRef.current.checked) {
      mobilePlatform = "android";
    } else if (iosPlatformRef.current.checked) {
      mobilePlatform = "ios";
    }

    // add the profile details as query parameters to the store page
    // then redirect to the store page with the query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("age", ageRef.current.value);
    queryParams.append("sex", sexRef.current.value);
    queryParams.append("height", heightRef.current.value);
    queryParams.append("weight", weightRef.current.value);
    queryParams.append("mobilePlatform", mobilePlatform);
    queryParams.append("activityLevel", activityLevelRef.current.value);

    const queryString = queryParams.toString();
    window.location.href = `/store?${queryString}`;
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
            <option value="dont-specify">I&apos;d rather not specify</option>
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
              ref={androidPlatformRef}
              required
            />
            <label htmlFor="mobile-android">Android</label>
            <input
              id="mobile-ios"
              type="radio"
              name="mobile-platform"
              value="ios"
              ref={iosPlatformRef}
              required
            />
            <label htmlFor="mobile-ios">iOS</label>
          </div>
          <label htmlFor="activity-level">Activity level</label>
          <input
            id="activity-level"
            type="text"
            ref={activityLevelRef}
            required
            minLength={1}
          />
          <button>Personalize products</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
