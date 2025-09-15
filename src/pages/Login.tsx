import { useNavigate } from "react-router-dom";

import img from "@/assets/photo/signup.png";
import logo from "@/assets/icons/logo.svg";
import CommonWrapper from "@/common/CommonWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
// import { useLoginMutation } from "@/redux/api/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { useLoginMutation } from "@/store/api/auth/authApi";
import { setUser } from "@/store/Slices/user/userSlice";
// import { useAppDispatch } from "@/redux/hooks/redux-hook";
// import { setUser } from "@/redux/features/user/userSlice";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);
    try {
      const result = await login(data).unwrap();
      console.log({ result });
      if (result?.success) {
        if (result?.data?.user?.role !== "admin") {
          toast.error("You are not authorized to access this page");
          return;
        }
        dispatch(
          setUser({
            user: result?.data?.user,
            accessToken: result?.data?.accessToken,
          })
        );
        toast.success(result?.messsage || "Login Successfull");
        navigate("/admin-dashboard");
      } else {
        throw Error(result?.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Login Failed");
    }
  };
  return (
    <CommonWrapper>
      <div className=" flex space-x-8 px-6 md:px-4">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col mt-26 ">
          {/* Logo */}
          <div className="flex items-start gap-2 mb-6">
            <img src={logo} alt="" />
          </div>

          {/* Heading */}
          <h2 className="font-inter font-bold text-[40px] leading-[120%] tracking-[-0.8px] text-[#27272A] mb-2">
            Login to Your Account!
          </h2>

          <p className="text-gray-500 text-sm text-start mb-6 max-w-sm">
            Lorem ipsum dolor sit amet consectetur. Elit non consectetur elit eu
            nunc pulvinar vel dui. Feugiat ultrices lectus ut in magna.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
            {/* Email */}
            <div>
              <label className="block text-base font-medium text-[#000] mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#D5D7DB] bg-white"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-medium text-[#000] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#D5D7DB] bg-white"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 mt-3 px-4 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer disabled:opacity-70 disabled:cursor-no-drop"
            >
              {isLoading ? "Loggin..." : "Log In"}
            </button>
          </form>

          {/* Sign up link */}
          {/* <p className="text-base text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600  hover:text-blue-800">
              Sign up
            </Link>
          </p> */}
        </div>

        {/* Right Section */}
        <div className="hidden  lg:flex xl:flex 2xl:flex items-center justify-center bg-blue-100">
          <img src={img} alt="Boxes" className="w-full max-h-screen" />
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Login;
