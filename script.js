document.getElementById('fetch-data').addEventListener('click', fetchInstagramData);

async function fetchInstagramData() {
    const userName = document.getElementById('username-input').value;
    const profileUrl = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${userName}`;
    const profileOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1999c0e81cmsh9067930e536e347p148535jsn658c2251c4c7',
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };

    const reelsUrl = `https://instagram-scraper-api2.p.rapidapi.com/v1.2/reels?username_or_id_or_url=${userName}`;
    const reelsOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1999c0e81cmsh9067930e536e347p148535jsn658c2251c4c7',
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };

    try {
        const profileResponse = await fetch(profileUrl, profileOptions);
        const profileResult = await profileResponse.json();

        const profileCard = document.getElementById('profile-card');
        const fullName = document.getElementById('full-name');
        const username = document.getElementById('username');
        const biography = document.getElementById('biography');
        const followerCount = document.getElementById('follower-count');

        fullName.textContent = profileResult.data.full_name;
        username.textContent = `@${profileResult.data.username}`;
        biography.textContent = profileResult.data.biography;
        followerCount.textContent = `Followers: ${profileResult.data.follower_count.toLocaleString()}`;

        // Clear previous reels
        const reelsContainer = document.getElementById('reels-container');
        reelsContainer.innerHTML = '';

        // Fetch reels
        const reelsResponse = await fetch(reelsUrl, reelsOptions);
        const reelsResult = await reelsResponse.json();

        reelsResult.data.items.forEach(item => {
            const reelCard = document.createElement('div');
            reelCard.classList.add('reel-card');
            reelCard.innerHTML = `
                <video controls>
                    <source src="${item.video_url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            reelsContainer.appendChild(reelCard);
        });
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
    }
}

// Fetch data on page load with default username
fetchInstagramData();
