"use client";

import React, { useEffect, useState } from "react";
import {
  Trash2,
  ShieldAlert,
  UserCheck,
  Eye,
  Search,
  UserPlus,
  X,
  Info,
} from "lucide-react";
import {
  useDeleteHandelByAdminMutation,
  useGetAllUserByAdminQuery,
} from "@/lib/api/baseApi";
import LoadingStat from "@/components/admin/LoadingStat";
import Image from "next/image";
import toast, { Toast, ToastBar, Toaster } from "react-hot-toast";

// learn tag , provide, invalid
// pagination ,  delete  , user handel  ,
// payment

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [cursor, setCursor] = useState("");

  const { data, isLoading } = useGetAllUserByAdminQuery({
    search: searchText,
    lastId: cursor,
    limit: 10,
  });
  const [deleteHandelByAdmin, { isLoading: isDeleteLoading }] =
    useDeleteHandelByAdminMutation();

  const users = data?.data?.allUser || [];
  const isCursorExits = data?.data?.nextCursor;

  // HANDEL DELETE USER

  const confirmDelete = async (userId: string | number, toastOption: Toast) => {
    if (!userId) {
      return;
    }

    try {
      const result = await deleteHandelByAdmin(userId).unwrap();

      console.log(result);
      toast.success("User Delete Successfully");

      toast.dismiss(toastOption.id);
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message || "Something Wrong"}`);
    }
  };

 const handleDeleteUser = (userId: string | number) => {
  toast.custom(
    (t) => (
      <div className={`${t.visible ? 'animate-in fade-in zoom-in-95' : 'animate-out fade-out zoom-out-95'} w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 pointer-events-auto`}>
        <div className="flex items-start gap-4">
          {/* Warning Icon - Immediately communicates danger */}
          <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 leading-6">
              Delete User?
            </h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              This will permanently remove the user and all associated data. This action <span className="font-semibold text-gray-700">cannot be undone</span>.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => toast.remove(t.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            Keep User
          </button>
          <button
            onClick={async () => {
              
              await confirmDelete(userId, t);
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm shadow-red-200 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: "top-center",
    }
  );
};

  const handelNextCursor = () => {
    console.log("handel next click");

    if (isCursorExits) {
      setCursor(isCursorExits);
    }
  };

  console.log(data, " users");

  if (isLoading) {
    return <LoadingStat />;
  }
  console.log(searchText, " search text");

  return (
    <div className="p-8 bg-slate-950 min-h-screen font-sans text-slate-200">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            User Management
          </h1>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/40 border-b border-slate-800">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  User Profile
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Access Role
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Administrative
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user: any, key) => (
                <tr
                  key={key}
                  className="hover:bg-indigo-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {/* Image */}
                        <Image
                          // gave demo avator for all user
                          src={
                            "https://img.icons8.com/office/40/gender-neutral-user.png"
                          }
                          alt={user?.name}
                          height={40}
                          width={40}
                          loading="lazy"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-500"}`}
                        ></div>
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-300">
                    <span className="bg-slate-800 px-3 py-1 rounded-md border border-slate-700 text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 ring-rose-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-400" : "bg-rose-400"}`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        title="View Details"
                        className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-xl transition-all"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        title={
                          user.status === "Active"
                            ? "Block User"
                            : "Unblock User"
                        }
                        className={`p-2.5 transition-all rounded-xl ${
                          user.status === "Active"
                            ? "text-slate-400 hover:text-amber-400 hover:bg-amber-400/10"
                            : "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                        }`}
                      >
                        <ShieldAlert size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete User"
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex  items-center justify-center gap-x-5 gap-y-2 mt-4">
        <button className="px-4 border border-none cursor-pointer">Prev</button>
        <button
          disabled={!isCursorExits}
          onClick={handelNextCursor}
          className="px-4 border-none cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm italic">
        <Info size={14} />
        <span>Changes to user permissions are logged in the audit trail.</span>
      </div>
    </div>
  );
};

export default UserManagement;
