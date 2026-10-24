import { redirect } from "next/navigation";
import { getRole } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/Content";
import { deleteUser } from "../../actions";
import UserForm from "./UserForm";

export const dynamic = "force-dynamic";

export default async function UsersAdmin() {
  if ((await getRole()) !== "admin") redirect("/admin");
  await connectDB();
  const rows = await AdminUser.find().sort({ createdAt: 1 }).lean();
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Users</h1>
      <p className="mt-2 text-sm text-muted">
        People who can sign in to this panel. The owner account from the server settings always works.
      </p>

      <details className="mt-8 border border-silver bg-white">
        <summary className="cursor-pointer p-5 text-sm uppercase tracking-[0.2em]">+ Add user</summary>
        <div className="border-t border-silver-soft p-6">
          <UserForm />
        </div>
      </details>

      <div className="mt-6 space-y-4">
        {rows.map((r) => {
          const id = String(r._id);
          return (
            <details key={id} className="border border-silver bg-white">
              <summary className="cursor-pointer p-5">
                <span className="font-display text-xl text-charcoal">{r.name || r.email}</span>
                <span className="ml-3 text-sm text-muted">
                  {r.email} · {r.role}
                  {!r.active && " · disabled"}
                </span>
              </summary>
              <div className="border-t border-silver-soft p-6">
                <UserForm id={id} email={r.email} name={r.name ?? ""} role={r.role} active={r.active} />
                <form action={deleteUser} className="mt-4">
                  <input type="hidden" name="id" value={id} />
                  <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
                    Delete
                  </button>
                </form>
              </div>
            </details>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-muted">No extra users yet.</p>}
      </div>
    </>
  );
}
