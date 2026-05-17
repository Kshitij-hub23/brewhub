import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Coffee, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const data = await api.loginAdmin(email, password);
      localStorage.setItem("adminToken", data.access_token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      toast.success("Welcome admin");
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Admin login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass w-full max-w-md rounded-3xl p-8">

          <Link
              to="/"
              className="inline-flex items-center gap-1.5 mb-6 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-primary shadow-sm hover:bg-accent/10 hover:border-accent hover:text-accent transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Kiosk
          </Link>

          <div className="flex items-center gap-2 text-primary mb-6">
            <Coffee className="h-8 w-8 text-accent" />
            <div>
              <div className="text-xl font-bold">BrewHub Admin</div>
              <div className="text-xs text-muted-foreground">
                Login through FastAPI backend
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Email</Label>
              <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && signIn()}
                  placeholder="admin@gmail.com"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && signIn()}
                  placeholder="admin123"
              />
            </div>

            <Button className="w-full" onClick={signIn} disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
  );
}