import DashboardPage from "@/components/DashboardPage"
import ProtectedRoute from "@/components/ProtectedRoute"
import TopBar from "@/components/TopBar"


export default function Home() {
	return (
		<ProtectedRoute>
			<main className="w-full h-full">
				<TopBar />
				<div className="w-full h-[calc(100vh-4rem)] overflow-hidden">
					<DashboardPage />
				</div>
			</main>
		</ProtectedRoute>
	)
}
