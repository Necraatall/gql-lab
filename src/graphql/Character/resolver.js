const queries = {
    Character: (root, args) => {
        return {
            id: "12345",
            firstName: "ABAKUS",
            familyName: "FIRSTCHAR",
            gendre: "from python random ? db ?",
            race: [
                {
                    humanType: "Europoidic-Nordic",
                    metatype: "Troll",
                }
            ],
            appearence: {
                face: [
                    {
                        faceShape: "Oval",
                        hairStyle: "pushed back long",
                        hairColor: "ginger",
                        hairType: "very straight hair",
                    }
                ],
                body: [
                    {
                        Stature: "from race tall"
                    }
                ]
            }
        };
    },
};


export const resolvers = { queries };