import supabase from '@/supabaseClient'
import { useUserStore, UserState } from '@/stores/user'

export default function useFindRecord() {
    const user = useUserStore((state: UserState) => state.user)

    async function findRecord(recordID: number, type: string) {
        if (!user) return

        // Validate table name to prevent SQL injection
        const allowedTables = ["expenses", "income"]; 
        if (!allowedTables.includes(type)) {
            console.error(`Invalid table name: ${type}`);
            return null;
        }

        try {
            const {data, error} = await supabase.from(`${type}`).select("*").eq("user_id", user.id).eq("id", recordID)

            if (error) {
                console.error("Failed to load record details: ", error.message)
            }

            return data
        } catch (error) {
            console.error('Unexpected error:', error)
        }
    }
    return findRecord
}