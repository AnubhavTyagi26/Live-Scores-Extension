async function getMatchData(seriesIds) {
    const allMatches = [];

    for (const seriesId of seriesIds) {
        try {
            const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=505b81b8-d9e4-4a13-91a3-ad403120fe50&offset=0`);
            const data = await response.json();

            if (data.status !== "success" || !data.data) continue;

            const matchesList = data.data;
            const relevantData = matchesList.filter(match => match.series_id === seriesId)
                                             .map(match => `${match.name}, ${match.status}`);
            
            allMatches.push(...relevantData);
        } catch (error) {
            console.error(error);
        }
    }

    const matchesContainer = document.getElementById("matches");
    matchesContainer.innerHTML = allMatches.map(match => `<li>${match}</li>`).join('');
    return allMatches;
}

const seriesIds = ["a5f5095a-72ed-455e-969f-30283ed18305","5f09d66b-284c-4a0e-994f-5a8d6c0212f0", "c04def08-0f9c-4f29-8008-725e96dc193e", "423e93da-fd50-4fae-a74e-5e6f8fb7ff3b"];
getMatchData(seriesIds);
