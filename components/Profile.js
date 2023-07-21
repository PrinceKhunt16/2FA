export default function Profile({ user }) {
    return (
        <section className="container mt-5">
            <div className="card border">
                <div className="card-body">
                    <h1 className="card-title">User Profile</h1>
                    <p class="card-text">Name: {user.name}</p>
                    <p class="card-text">Email: {user.email}</p>
                </div>
            </div>
        </section>
    )
}