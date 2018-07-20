export const ListGrudges = `
    query ListGrudges {
        listGrudges {
            items {
                id,
                person,
                deed,
                avenged
            }
        }
    }
`;

export const CreateGrudge = `
    mutation CreateGrudge(
        $person: String!,
        $deed: String!,
        $avenged: Boolean!
    ) {
        createGrudge(input: {
            person: $person,
            deed: $deed,
            avenged: $avenged
        }) {
            id
            person
            deed
            avenged
        }
    }
`;

export const UpdateGrudge = `
    mutation UpdateGrudge(
        $id: ID!,
        $person: String!,
        $deed: String!,
        $avenged: Boolean!
    ) {
        updateGrudge(input: {
            id: $id,
            person: $person,
            deed: $deed,
            avenged: $avenged
        }) {
            id
            person
            deed
            avenged
        }
    }
`;

export const DeleteGrudge = `
    mutation DeleteGrudge($id: ID!) {
        deleteGrudge(input: { id: $id }) { id }
    }
`;

export const SubscribeToNewGrudge = `
    subscription SubscribeToNewGrudges {
        onCreateGrudge {
            id
            person
            deed
            avenged
        }
    }
`;
