# Install
```
nvm use 18
node --version
v18.16.0
npm --version
9.5.1
nvm --version
0.39.3

```


```
npm i
```

# Run

```
npm start
```


# install DB
npm install drizzle-orm
npm install better-sqlite3

## tabulky:

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