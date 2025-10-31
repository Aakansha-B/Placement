import { motion } from "framer-motion";

export default function Button({ to, children, variant = "primary" }) {
  const base = "px-6 py-3 rounded-2xl font-semibold transition";
  const styles = {
    primary: "text-white bg-gradient-to-r from-brand to-accent shadow-lg hover:scale-105",
    outline: "border border-brand text-brand hover:bg-brand/10",
  };

  return (
    <motion.a
      href={to}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </motion.a>
  );
}
