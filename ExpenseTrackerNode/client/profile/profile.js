const UserProfile = "http://localhost:3000/user";
const PremiumFeatureLink = "http://localhost:3000/premium";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../signUp/signup.html";
}
window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch user profile using axios
    const response = await axios.get(`${UserProfile}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = response.data;

    // Set badge
    const badge = document.getElementById("profile-type");
    badge.textContent = user.data.isPremium ? "Premium" : "Free";
    badge.classList.add(user.data.isPremium ? "premium" : "free");

    // Generate initials from name
    const initials = user.data.username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    document.getElementById("profile-photo").textContent = initials;

    // Basic profile details (shown to all users)
    const details = document.getElementById("profile-details");
    details.innerHTML = `
      <div class="info-item">
        <label>Name:</label>
        <span>${user.data.username}</span>
      </div>
      <div class="info-item">
        <label>Email:</label>
        <span>${user.data.email}</span>
      </div>
    `;

    // Premium features section
    const premiumSection = document.getElementById("premium-features");

    if (user.data.isPremium) {
      // Fetch leaderboard data for premium users using axios
      const leaderboardRes = await axios.get(
        `${PremiumFeatureLink}/leaderboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const leaderboardData = leaderboardRes.data;

      if (leaderboardData.success) {
        // Find current user's position
        const currentUsername = user.data.username;
        const userRank =
          leaderboardData.data.findIndex(
            (u) => u.username === currentUsername
          ) + 1;
        const totalUsers = leaderboardData.data.length;

        premiumSection.innerHTML = `
          <h3>Expense Analytics</h3>
          <div class="feature-item">
            <label>Total Expenses:</label>
            <strong>₹${user.data.totalExpenses || 0}</strong>
          </div>
          <div class="feature-item">
            <label>Monthly Average:</label>
            <strong>₹${user.monthlyAvg || 0}</strong>
          </div>
          
          <h3 style="margin-top: 25px;">🏆 Your Position</h3>
          <div class="feature-item rank-highlight">
            <label>Leaderboard Rank:</label>
            <strong>#${userRank} of ${totalUsers}</strong>
          </div>
        `;
      }
    } else {
      // Not premium - show blurred content
      premiumSection.innerHTML = `
        <h3>Expense Analytics</h3>
        <div class="feature-item">
          <label>Total Expenses:</label>
          <strong>₹****</strong>
        </div>
        <div class="feature-item">
          <label>Monthly Average:</label>
          <strong>₹****</strong>
        </div>
        <h3 style="margin-top: 25px;">🏆 Leaderboard</h3>
        <div class="feature-item">
          <label>Your Rank:</label>
          <strong>#**</strong>
        </div>
      `;
      premiumSection.classList.add("locked");
    }
  } catch (error) {
    console.error("Error loading profile:", error);
    if (error.response) {
      console.error("Response error:", error.response.data);
    }
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.clear();
   window.location.href = "../signUp/signup.html";
});
