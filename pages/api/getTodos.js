import { table, minifyRecords } from './utils/Airtable';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const {user} = await getSession(req,res)
    try {
        const records = await table
        .select({
            filterByFormula: `userId = '${user.sub}'`,
        }).firstPage();
        const minifiedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(minifiedRecords);
    } catch (err) {
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});
